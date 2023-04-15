const SalaryRange = props => {
  const {eachElement, onChangeSalaryInput} = props
  const changeSalaryInput = () => {
    onChangeSalaryInput(eachElement.salaryRangeId)
  }

  return (
    <li>
      <label className="label-element" onClick={changeSalaryInput}>
        <input
          type="radio"
          value={eachElement.salaryRangeId}
          className="checkbox-element"
          name="salary"
        />
        {eachElement.label}
      </label>
    </li>
  )
}

export default SalaryRange
