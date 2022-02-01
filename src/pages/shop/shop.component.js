import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  firestore,
  convertCollectionsSnapshotToMap,
} from '../../firebase/firebase.utils';

import { updateCollections } from '../../redux/shop/shop.actions';

import WithSpinner from '../../components/with-spinner/with-spinner.component';

import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/collection.component';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// import SHOP_DATA from './shop.data.js';

// import CollectionPreview from '../../components/collection-preview/collection-preview.component';

// class ShopPage extends React.Component {
//   constructor(props) {
//     super(props);

//     this.state = {
//       collections: SHOP_DATA,
//     };
//   }

//   render() {
//     const { collections } = this.state;
//     return (
//       <div className="shop-page">
//         {collections.map(({ id, ...otherCollectionProps }) => (
//           <CollectionPreview key={id} {...otherCollectionProps} />
//         ))}
//       </div>
//     );
//   }
// }

class ShopPage extends React.Component {
  state = {
    loading: true,
  };

  unsubscribeFromSnapshot = null;

  componentDidMount() {
    const { updateCollections } = this.props;
    const collectionRef = firestore.collection('collections');

    // collectionRef.onSnapshot(async snapshot => {
    //   // 把回來的資料轉成我們要的資料型態
    //   const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //   updateCollections(collectionsMap);
    //   this.setState({ loading: false });
    // });
    //

    // 結果同上
    collectionRef.get().then(snapshot => {
      // 把回來的資料轉成我們要的資料型態
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
      updateCollections(collectionsMap);
      this.setState({ loading: false });
    });

    // 這個方法也能取得資料 但資料被埋得很深 不建議在此使用
    // fetch(
    //   'https://firestore.googleapis.com/v1/projects/crwn-db-de3e1/databases/(default)/documents/collections'
    // )
    //   .then(response => response.json())
    //   .then(collections => console.log(collections));
  }

  render() {
    const { match } = this.props;
    const { loading } = this.state;
    // 資料來源:https://stackoverflow.com/questions/59256109/difference-between-passing-component-to-route-as-prop-and-wrapping-component-in
    return (
      <div className="shop-page">
        <Route
          exact
          path={`${match.path}`}
          render={props => (
            <CollectionsOverviewWithSpinner isLoading={loading} {...props} />
          )}
        />
        <Route
          path={`${match.path}/:collectionId`}
          render={props => (
            <CollectionPageWithSpinner isLoading={loading} {...props} />
          )}
        />
        {/* <Route exact path={`${match.path}`} component={CollectionsOverview} />
        <Route
          path={`${match.path}/:collectionId`}
          component={CollectionPage}
        /> */}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap =>
    dispatch(updateCollections(collectionsMap)),
});

export default connect(null, mapDispatchToProps)(ShopPage);
