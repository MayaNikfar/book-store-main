import './LineItem.css';

export default function LineItem({ lineItem, isPaid, handleChangeQty }) {
  return (
    <div className="LineItem">
      <div><img src={lineItem.item.imageUrl} alt={""} className="item-image"/></div>
      <div className="flex-ctr-ctr flex-col">
        <span className="align-ctr" style={{ paddingLeft: '15px' }}>{lineItem.item.name}</span>
        <span style={{ paddingLeft: '15px' }}>{lineItem.item.price.toFixed(2)}</span>
      </div>
      <div className="qty" style={{ justifyContent: isPaid && 'center' }}>
        {!isPaid &&
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty - 1)}
            >−</button>
          }
        <span>{lineItem.qty}</span>
        {!isPaid &&
          <button
            className="btn-xs"
            onClick={() => handleChangeQty(lineItem.item._id, lineItem.qty + 1)}
          >+</button>
        }
      </div>
      <div className="ext-price"  style={{ paddingRight: '5px' }}>${lineItem.extPrice.toFixed(2)}</div>
    </div>
  );
}