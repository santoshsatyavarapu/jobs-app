const SkillCard = props => {
  const {eachElement} = props

  return (
    <li className="row-container-detailed-skill">
      <img
        src={eachElement.imageUrl}
        alt={eachElement.name}
        className="skill-image"
      />
      <p className="skill-name">{eachElement.name}</p>
    </li>
  )
}

export default SkillCard
