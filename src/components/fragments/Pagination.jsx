const Pagination = ({ page, handleChangePage }) => {
  return (
    <div>
      <button onClick={() => handleChangePage(page - 1)}>&lt;</button>
    </div>
  );
};
export default Pagination;
