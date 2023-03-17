import React from 'react';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      productsList: [],
    };
  }

  render() {
    const { productsList } = this.state;
    const isEmpty = productsList.length === 0;
    return (
      <div>
        {isEmpty
          && (
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
      </div>
    );
  }
}

export default Home;
