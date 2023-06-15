import { useSignal } from "@preact/signals";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { RoundedButton } from "../components/Button.tsx";
import { IconMinus, IconPlus } from "../components/Icons.tsx";

interface CounterProps {
  start: number;
}

export default function Counter(props: CounterProps) {
  const count = useSignal(props.start);
  return (
    <div class="bg-gray-100 p-4 border border-gray-200 flex items-center justify-around">
      <RoundedButton
        id="sub-rounded-btn"
        title="Subtract 1"
        onClick={() => count.value -= 1}
        disabled={!IS_BROWSER || count.value <= 0}
      >
        <IconMinus />
      </RoundedButton>
      <div class="text-3xl tabular-nums" id="counter">{count}</div>
      <RoundedButton
        id="add-rounded-btn"
        title="Add 1"
        onClick={() => count.value += 1}
        disabled={!IS_BROWSER}
      >
        <IconPlus />
      </RoundedButton>
    </div>
  );
}
