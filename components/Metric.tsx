import Image from "next/image";
import Link from "next/link";

interface Props {
  imgUrl: string;
  alt: string;
  value: number | string;
  title: string;
  href?: string;
  textStyle?: string;
  isAuthor?: boolean;
  imageStyle?: string;
}

export default function Metrics({ imgUrl, alt, value, title, href, textStyle, isAuthor, imageStyle }: Props) {
  const metricsContent = (
    <>
      <Image
        src={imgUrl}
        alt={alt}
        width={isAuthor ? 32 : 16}
        height={isAuthor ? 32 : 16}
        className={`${isAuthor ? "rounded-full object-contain" : ""} ${imageStyle}`}
      />
      <p className={`${textStyle} flex items-center gap-1`}>
        {value}

        <span className={`small-regular line-clamp-1 ${isAuthor ? "max-sm:hidden" : ""}`}>{title}</span>
      </p>
    </>
  );

  return href ? (
    <Link className="flex-center gap-1" href={href}>
      {metricsContent}
    </Link>
  ) : (
    <div className="flex-center gap-1">{metricsContent}</div>
  );
}
