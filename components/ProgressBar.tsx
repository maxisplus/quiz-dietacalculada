interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="relative w-full h-[3px] bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-black transition-all duration-500 ease-out rounded-full"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

