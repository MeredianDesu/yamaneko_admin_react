import { type HTMLInputAutoCompleteAttribute } from 'react'
import { noop } from 'shared/helpers/noop'

export interface Props extends Input, Img {
  className?: string
}

export interface Input {
  name: string
  type?: string
  placeholder?: string
  autoComplete?: HTMLInputAutoCompleteAttribute
  onChange?: () => void
}

export interface Img extends Omit<Partial<HTMLImageElement>, 'src' | 'name'> {
  src: string
}

export const Input = ({
  className,
  name,
  type = 'text',
  placeholder,
  autoComplete = 'off',
  onChange = noop,
  src,
  alt = '',
}: Props) => {
  return (
    <div className={className}>
      <img src={src} alt={alt} />
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        onChange={() => onChange()}
      />
    </div>
  )
}
