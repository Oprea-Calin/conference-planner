const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
};
 

const LessonFour : React.FC = () =>{
    return (
        <div>
        <h1>Lesson Four</h1>
        <h2>{user.name}</h2>
        <img
                src={user.imageUrl}
                alt={user.name}
                style={{
                    width: user.imageSize,
                    height: user.imageSize,
                    borderRadius:'50%'
        }}
        />



        </div>
    );
};

export default LessonFour