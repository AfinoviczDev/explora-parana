'use client'
import * as React from 'react'

export function Label({ children }: { children: React.ReactNode }) {
  return <label className="label">{children}</label>
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={"input " + (props.className||'')} />
}
export function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={"input min-h-24 " + (props.className||'')} />
}
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement> & {variant?: 'primary'|'default'}) {
  const variant = props.variant === 'primary' ? 'btn btn-primary' : 'btn'
  const { className, ...rest } = props
  return <button {...rest} className={variant + ' ' + (className||'')} />
}
