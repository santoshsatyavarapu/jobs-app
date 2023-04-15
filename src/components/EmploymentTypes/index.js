const EmploymentTypes = props => {
  const {eachElement, employmentIds, updateEmploymentIds} = props

  const getValue = event => {
    updateEmploymentIds(event.target.value)
  }
  const isChecked = employmentIds.includes(eachElement.employmentTypeId)

  return (
    <li>
      <label className="label-element">
        <input
          type="checkbox"
          className="checkbox-element"
          onChange={getValue}
          checked={isChecked}
          value={eachElement.employmentTypeId}
        />
        {eachElement.label}
      </label>
    </li>
  )
}

export default EmploymentTypes
