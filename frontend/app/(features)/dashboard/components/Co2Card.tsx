import Icon from "@/app/global/components/Icon";

type Props = {
  kg?: number;
};

export default function Co2Card({ kg = 23.5 }: Props) {
  return (
    <article className="rounded-4 border border-grey-100 bg-surface-2 p-20 flex items-center justify-between gap-16">
      <div className="flex items-center gap-12">
        <span className="grid place-items-center w-48 h-48 rounded-full bg-success-100 text-success-text shrink-0">
          <Icon iconName="leaf" />
        </span>
        <div className="flex flex-col gap-4">
          <h2 className="uppercase text-base font-bold">CO₂-aftryk</h2>
          <p className="text-sm text-grey-200">Dit forbrug denne måned</p>
        </div>
      </div>
      <p className="text-success-text font-extrabold text-xl leading-none whitespace-nowrap">
        {kg.toLocaleString("da-DK")}
        <span className="text-sm font-bold ml-4">kg</span>
      </p>
    </article>
  );
}
