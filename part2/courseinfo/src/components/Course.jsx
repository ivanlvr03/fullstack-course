

const Header = ({name}) => <h1>{name}</h1>;

const Part = ({ name, exercises }) => <p>{name} {exercises}</p>;


const Content = ({ parts }) => {
    return (
        <div>
            {parts.map(part => (
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            ))}
        </div>
    );
    }
    
const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  console.log('Total exercises:', totalExercises);
  

  return (
    <div>
      <p><b>Total of {totalExercises} exercises</b></p>
    </div>
  );
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
    );
}

export default Course;