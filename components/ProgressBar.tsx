interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="relative w-full h-2 md:h-2.5 bg-gray-200 rounded-full overflow-hidden">
      {/* Progress fill with smooth transition */}
      <div
        className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all duration-700 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
