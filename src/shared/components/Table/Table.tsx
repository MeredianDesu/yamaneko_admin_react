interface Props {
  className?: string
  displayedValues: string[]
  data: object[]
}

export const Table = ({ className, displayedValues = ['id'], data }: Props) => {
  const headFields = displayedValues.reduce(
    (acc, value) => {
      acc[value] = value.toString()
      return acc
    },
    {} as Record<string, string>,
  )

  const displayedReleases = data.map((release) => {
    return Object.keys(headFields).reduce(
      (acc, field) => {
        if (field in release) {
          acc[field] = release[field as keyof typeof release]
        } else {
          acc[field] = 'unknown'
        }

        return acc
      },
      {} as Partial<typeof release>,
    )
  })

  return (
    <div className={className}>
      <table>
        <thead>
          <tr>
            {Object.keys(headFields).map((key) => (
              <th key={key}>{headFields[key]}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedReleases.map((row, idx) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <tr key={idx}>
                {Object.keys(headFields).map((field) => (
                  <td key={field}>{row[field]}</td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}
