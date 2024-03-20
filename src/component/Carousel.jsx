import PropTypes from 'prop-types';
import Card from './Card.jsx'; 

const Carousel = ({ onLeftClick, onRightClick, elementList = [] }) => {
  return (
    <div className="flex w-full justify-center items-center">
      <button onClick={onLeftClick} className="border-t-4 border-l-4 border-gray-300 w-8 h-8 -rotate-45"></button>
      <div className="w-full h-auto flex flex-wrap">
        {elementList.map((element) => (
          <Card key={element.name} img={element.img} name={element.name} onClick={element.onClick} />
        ))}
      </div>
      <button onClick={onRightClick} className="border-t-4 border-r-4 border-gray-300 w-8 h-8 rotate-45"> </button>
    </div>
  );
};


Carousel.propTypes = {
  onLeftClick: PropTypes.func.isRequired,
  onRightClick: PropTypes.func.isRequired,
  elementList: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      img: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default Carousel;