import React, { ButtonHTMLAttributes, InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  className?: string
}

export const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => (
  <button
    className={`inline-flex items-center justify-center rounded-2xl px-6 py-3 text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:pointer-events-none ${className}`}
    {...props}
  >
    {children}
  </button>
)

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export const Input: React.FC<InputProps> = ({ className = '', ...props }) => (
  <input
    className={`flex h-12 w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 text-sm text-gray-100 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-white/20 focus:bg-white/10 transition-all duration-300 ${className}`}
    {...props}
  />
)

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}

export const Textarea: React.FC<TextareaProps> = ({ className = '', ...props }) => (
  <textarea
    className={`flex min-h-[120px] w-full rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl px-4 py-3 text-sm text-gray-100 placeholder:text-gray-500/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30 focus-visible:border-white/20 focus:bg-white/10 resize-none transition-all duration-300 ${className}`}
    {...props}
  />
)

interface CardProps {
  children: React.ReactNode
  className?: string
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => (
  <div
    className={`rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-xl shadow-black/10 transition-all duration-500 hover:bg-white/[0.08] hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/5 hover:scale-[1.02] ${className}`}
  >
    {children}
  </div>
)

export const CardHeader: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
)

export const CardTitle: React.FC<CardProps> = ({ children, className = '' }) => (
  <h3 className={`font-semibold leading-none tracking-tight text-xl text-white/95 ${className}`}>
    {children}
  </h3>
)

export const CardContent: React.FC<CardProps> = ({ children, className = '' }) => (
  <div className={`p-6 pt-0 text-gray-300/90 ${className}`}>{children}</div>
)
