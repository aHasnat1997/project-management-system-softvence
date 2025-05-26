export default function Headers({ title, children }: { title: string, children?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="text-lg font-semibold text-primary">{title}</h1>
      <div>
        {children}
      </div>
    </div>
  )
};
