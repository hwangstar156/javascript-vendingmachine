const productTemplate = {
  input: () => `
    <form id="add-product-form" class="form">
        <label for="product-name-input">추가할 상품 정보를 입력해주세요.</label>
        <div class="input-container">
          <input id="product-name-input" class="input" placeholder="상품명"/>
          <input id="product-price-input" class="input" placeholder="가격" type="number"/>
          <input id="product-count-input" class="input" placeholder="수량" type="number"/>
          <button id="add-product-button" class="button">추가</button>
        </div>
    </form>
    <section id="product-status">

    </section>
  `,

  productStatus: (products) => `
      <h2>상품 현황</h2>
      <table>
        <colgroup>
          <col width="23%"></col>
          <col width="23%"></col>
          <col width="23%"></col>
          <col width="31%"></col>
        </colgroup>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
        ${products
          .map(
            ({ name, price, count }, idx) => `
          <tr id=${idx}>
            <td>${name}</td>
            <td>${price}</td>
            <td>${count}</td>
            <td>
              <button class="edit-button process-button">수정</button>
              <button class="delete-button process-button">삭제</button>
            </td>
          </tr>

          `
          )
          .join("")}
          
        </tbody>
      </table>
  `,
};

export default productTemplate;