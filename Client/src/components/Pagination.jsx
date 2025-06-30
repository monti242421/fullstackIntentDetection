import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productsSliceAction } from "../store/productsSlice";

const Pagnition = ({ totalpages }) => {
  const totalPages = totalpages;
  const buttonsPerSet = 10;
  const [setIndex, setSetIndex] = useState(0); // controls which 10-page set is shown
  const dispatch = useDispatch();
  const start = setIndex * buttonsPerSet + 1;
  const end = Math.min(start + buttonsPerSet - 1, totalPages);
  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  const handleNext = () => {
    if (end < totalPages) setSetIndex(setIndex + 1);
  };

  const handlePrev = () => {
    if (setIndex > 0) setSetIndex(setIndex - 1);
  };

  const HandleSetPage = (page) => {
    dispatch(productsSliceAction.setCurrentPage(page));
  };
  return (
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Previous"
            onClick={handlePrev}
            disabled={setIndex === 0}
          >
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>
        {pages.map((page) => {
          return (
            <li class="page-item">
              <a
                class="page-link"
                href="#"
                onClick={() => HandleSetPage(page)}
                style={{ width: "45px", textAlign: "center" }}
              >
                {page}
              </a>
            </li>
          );
        })}

        <li class="page-item">
          <a
            class="page-link"
            href="#"
            aria-label="Next"
            onClick={handleNext}
            disabled={end >= totalPages}
          >
            <span aria-hidden="true">&raquo;</span>
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Pagnition;
