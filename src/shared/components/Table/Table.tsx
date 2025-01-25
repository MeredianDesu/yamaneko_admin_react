import { useLocation, useNavigate } from 'react-router-dom'

interface Props {
  className?: string
  displayedValues: string[]
  data: object[]
}

export const Table = ({ className, displayedValues = ['id'], data }: Props) => {
  const navigate = useNavigate()
  const location = useLocation()

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
        const fieldParts = field.split('.')
        let value: unknown = release

        // Traverse nested fields
        for (const part of fieldParts) {
          value = value?.[part]
          if (value === undefined) break
        }

        acc[field] = value ?? 'unknown'
        return acc
      },
      {} as Record<string, unknown>,
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
              <tr
                key={idx}
                onClick={() => {
                  const currentPath = location.pathname.endsWith('/')
                    ? location.pathname.slice(0, -1)
                    : location.pathname

                  navigate(`${currentPath}/${row.id}`)
                }}
              >
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
