type TSectionTitleProps = {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

const SectionTitle = ({
  title,
  subtitle,
  align = "center",
}: TSectionTitleProps) => {
  return (
    <div className={`${align === "center" ? "text-center" : "text-left"}`}>
      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
