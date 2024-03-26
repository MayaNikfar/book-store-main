import './CategoryList.css';

export default function CategoryList({ categories, activeCat, setActiveCat }) {
  const cats = categories.map(cat =>
    <li
      key={cat}
      className={cat === activeCat ? 'active' : ''}
      // FYI, the below will also work, but will give a warning
      // className={cat === activeCat && 'active'}
      onClick={() => setActiveCat(cat)}
    >
      {cat}
    </li>
  );
  return (
    <>
      <ul  class="CategoryList d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom mb-md-0">
        {cats}
      </ul>
    </>
  );
}
