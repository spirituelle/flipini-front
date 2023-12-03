import { cx } from "./../utils/all";

export default function Container({large, alt, className, children}: {large: boolean, alt: boolean, className: string, children: any }) {
  return (
    <div
      className={cx(
        "container px-8 mx-auto xl:px-5",
        large ? " max-w-screen-xl" : " max-w-screen-lg",
        !alt && "py-5 lg:py-8",
        className
      )}>
      {children}
    </div>
  );
}
