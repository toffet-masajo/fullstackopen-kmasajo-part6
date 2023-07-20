import { connect } from "react-redux";

import { applyFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  // const dispatch = useDispatch();

  const handleChange = (event) => {
    // dispatch(applyFilter(event.target.value));
    props.applyFilter(event.target.value);
  };

  const style = { marginBottom: 10 };

  return(
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  applyFilter
};

// export default Filter;
export default connect(
  null,
  mapDispatchToProps
)(Filter);
