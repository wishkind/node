import React, { PureComponent } from 'react';
import { ListItem, ListInfo, LoadMore } from '../style';
import { connect } from 'react-redux';
import { actionCreaters } from '../store';
import { Link } from 'react-router-dom';

class List extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { list, getMoreList, page } = this.props;
        return (
            <div>
                {
                    list.map((item, index) => {
                        return (
                            <Link key={index} to={'/detail/' + item.get('id')}>
                                <ListItem>
                                    <ListInfo>
                                        <h3 className='title'>{item.get('title')}</h3>
                                        <p className='desc'>{item.get('desc')}</p>
                                    </ListInfo>
                                    <img
                                        className='pic'
                                        src={item.get('imgUrl')}
                                        alt=''
                                    />
                                    {/* <ListMeta>
                                    <span>79.6</span>
                                    <a href='#'>万能的小考拉</a>
                                    <a href='#'>3</a>
                                    <span>15</span>
                                </ListMeta> */}
                                </ListItem>
                            </Link>
                        )
                    })
                }
                <LoadMore
                    onClick={() => getMoreList(page)}
                >
                    更多列表
                </LoadMore>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    list: state.getIn(['home', 'articleList']),
    page: state.getIn(['home', 'articlePage'])
})

const mapDispatchToProps = (dispatch) => ({
    getMoreList(page) {
        dispatch(actionCreaters.getMoreList(page))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(List);