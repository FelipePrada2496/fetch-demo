import PropTypes from 'prop-types';

const Summary = ({ data }) => {
  const transformed = () => {
    return data.stats.map((statData) => {
      return {
        value: statData.base_stat,
        statName: statData.stat.name,
      };
    });
  };

  return (
    <div className="flex w-96 bg-orange-400 px-10 py-5 rounded-md justify-center items-center">
      <div className="w-1/4 mr-5">
        <img src={data.img} alt="Pokemon" />
      </div>
      <div className="w-3/4 flex flex-col">
        {transformed().map((stat, idx) => (
          <div key={idx} className="flex text-white">
            <p>{stat.statName}:&nbsp;</p>
            <p>{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

Summary.propTypes = {
  data: PropTypes.shape({
    stats: PropTypes.arrayOf(
      PropTypes.shape({
        base_stat: PropTypes.number.isRequired,
        stat: PropTypes.shape({
          name: PropTypes.string.isRequired,
        }).isRequired,
      })
    ).isRequired,
    img: PropTypes.string.isRequired,
  }).isRequired,
};





export default Summary;