#!/bin/bash
# Usage: ./loop.sh [plan|specify] [max_iterations]
# Examples:
#   ./loop.sh              # Build mode, unlimited iterations
#   ./loop.sh 20           # Build mode, max 20 iterations
#   ./loop.sh plan         # Plan mode, unlimited iterations
#   ./loop.sh plan 5       # Plan mode, max 5 iterations
#   ./loop.sh specify      # Specify mode, unlimited iterations
#   ./loop.sh specify 3    # Specify mode, max 3 iterations

# Parse arguments
if [ "$1" = "plan" ]; then
    # Plan mode
    MODE="plan"
    PROMPT_FILE="PROMPT_plan.md"
    MAX_ITERATIONS=${2:-0}
elif [ "$1" = "specify" ]; then
    # Specify mode
    MODE="specify"
    PROMPT_FILE="PROMPT_specs.md"
    MAX_ITERATIONS=${2:-0}
elif [[ "$1" =~ ^[0-9]+$ ]]; then
    # Build mode with max iterations
    MODE="build"
    PROMPT_FILE="PROMPT_build.md"
    MAX_ITERATIONS=$1
else
    # Build mode, unlimited (no arguments or invalid input)
    MODE="build"
    PROMPT_FILE="PROMPT_build.md"
    MAX_ITERATIONS=0
fi

ITERATION=0
CURRENT_BRANCH=$(git branch --show-current)

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Mode:   $MODE"
echo "Prompt: $PROMPT_FILE"
echo "Branch: $CURRENT_BRANCH"
[ $MAX_ITERATIONS -gt 0 ] && echo "Max:    $MAX_ITERATIONS iterations"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Verify prompt file exists
if [ ! -f "$PROMPT_FILE" ]; then
    echo "Error: $PROMPT_FILE not found"
    exit 1
fi

while true; do
    if [ $MAX_ITERATIONS -gt 0 ] && [ $ITERATION -ge $MAX_ITERATIONS ]; then
        echo "Reached max iterations: $MAX_ITERATIONS"
        break
    fi

    # Temp file to capture text output for rate-limit detection
    ITER_OUTPUT=$(mktemp /tmp/claude-loop-XXXXXX.txt)

    # Run Claude iteration with selected prompt
    # -p: Headless mode (non-interactive, reads from stdin)
    # --dangerously-skip-permissions: Auto-approve all tool calls (YOLO mode)
    # --output-format=stream-json: Structured output for logging/monitoring
    # --model opus: Primary agent uses Opus for complex reasoning (task selection, prioritization)
    #               Can use 'sonnet' in build mode for speed if plan is clear and tasks well-defined
    # --verbose: Detailed execution logging
    cat "$PROMPT_FILE" | claude -p \
        --dangerously-skip-permissions \
        --output-format=stream-json \
        --model opus \
        --verbose | while IFS= read -r line; do
        # Parse JSON output to show only what the model is doing
        if echo "$line" | jq -e '.type == "assistant"' >/dev/null 2>&1; then
            # Extract text content (if any)
            text_content=$(echo "$line" | jq -r '.message.content[]? | select(.type == "text") | .text' 2>/dev/null)
            if [ -n "$text_content" ]; then
                echo "💬 $text_content"
                echo "$text_content" >> "$ITER_OUTPUT"
                echo
            fi

            # Extract tool uses (only show Bash commands and TodoWrite, skip file read/search noise)
            tool_info=$(echo "$line" | jq -r '.message.content[]? | select(.type == "tool_use") |
                if .name == "TodoWrite" then
                    "📝 Managing todo list:\n" +
                    (.input.todos[]? | "   [\(.status)] \(.content)" | gsub("in_progress"; "▶️ in_progress") | gsub("completed"; "✅ completed") | gsub("pending"; "⏸️  pending"))
                else
                    empty
                end' 2>/dev/null)

            if [ -n "$tool_info" ]; then
                echo -e "$tool_info"
                echo
            fi
        fi
    done

    # Check for rate limit message
    if grep -qi "hit your limit\|you've hit your limit\|hit .* limit" "$ITER_OUTPUT" 2>/dev/null; then
        # Try to extract reset time like "resets 4pm" or "resets 16:00"
        reset_time=$(grep -oiP 'resets\s+\K[0-9]{1,2}(:[0-9]{2})?\s*(am|pm)?' "$ITER_OUTPUT" | head -1)

        if [ -n "$reset_time" ]; then
            # Parse the reset time into epoch seconds using date
            # TZ is set to match the timezone in the message (default Europe/Stockholm)
            reset_tz=$(grep -oiP '\(([A-Za-z/_]+)\)' "$ITER_OUTPUT" | head -1 | tr -d '()')
            reset_tz=${reset_tz:-Europe/Stockholm}

            # Convert reset time to epoch
            target_epoch=$(TZ="$reset_tz" date -d "$reset_time" +%s 2>/dev/null)
            now_epoch=$(TZ="$reset_tz" date +%s)

            if [ -n "$target_epoch" ] && [ "$target_epoch" -gt "$now_epoch" ]; then
                wait_secs=$(( target_epoch - now_epoch + 60 ))  # +60s buffer
                wait_mins=$(( wait_secs / 60 ))
                echo "⏳ Rate limited. Waiting until $reset_time ($reset_tz) — ~${wait_mins} minutes..."
                sleep "$wait_secs"
            else
                echo "⏳ Rate limited. Could not parse reset time, waiting 60 minutes..."
                sleep 3600
            fi
        else
            echo "⏳ Rate limited. Waiting 60 minutes..."
            sleep 3600
        fi

        rm -f "$ITER_OUTPUT"
        echo "🔄 Resuming after rate limit wait..."
        continue
    fi

    rm -f "$ITER_OUTPUT"

    # Commit changes after each iteration
    git add -A && git commit -m "loop iteration $((ITERATION + 1)) [$MODE]" || echo "Nothing to commit."

    ITERATION=$((ITERATION + 1))
    echo -e "\n\n======================== LOOP $ITERATION ========================\n"
done