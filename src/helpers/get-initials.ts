function getInitials(name: string) {
  const pattern = /^(\S)|\s(\S)\w{2,}/g

  let abbr = ''
  let match: RegExpExecArray | null
  while ((match = pattern.exec(name))) {
    abbr += (match[1] || match[2]).toUpperCase() + '. '
  }

  return abbr
}

export default getInitials