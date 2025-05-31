interface Props {
  className: string
  src: string
  alt?: string
}

export const Image = ({ className, src, alt }: Props) => {
  return <img className={className} src={src} alt={alt} />
}
