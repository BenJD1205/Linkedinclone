import React from 'react'
import PostModal from './PostModal';
import styled from 'styled-components';
import {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getArticleAPI} from '../actions';
import ReactPlayer from 'react-player';
const Container = styled.div`
    grid-area:main;
`
const CommonCard = styled.div`
    text-align: center;
    overflow: hidden;
    margin-bottom: 8px;
    background-color:#fff;
    border-radius:5px;
    position: relative;
    border:none;
    box-shadow: 0 0 0 1px rgb(0 0 0 / 15%), 0 0 0 rgb(0 0 0 / 20%);
`
const ShareBox = styled(CommonCard)`
    display:flex;
    flex-direction:column;
    color:#958b7b;
    margin: 0 0 8px;
    background:white;
    div{
        button{
            outline:none;
            color:rgba(0,0,0,0.6);
            font-size:14px;
            line-height:1.5;
            min-height:48px;
            background:transparent;
            border:none;
            display:flex;
            align-items:center;
            font-weight:600;
        }

        &:first-child{
            display:flex;
            align-items:center;
            padding:8px 16px 0px 16px;
            img{
                width:48px;
                border-radius:50%;
                margin-right:8px;
            }

            button{
                margin:4px 0;
                flex-grow:1;
                border-radius:35px;
                padding-left:16px;
                border:1px solid rgba(0, 0, 0, 0.15);
                background-color:white;
                text-align: left;
                border-radius:35px;
            }
        }

        &:last-child{
            display:flex;
            flex-wrap:wrap;
            justify-content:space-around;
            padding-bottom:4px;
            button{
                img{
                    width:32px;
                    height:32px;
                    margin: 0 4px 0 -2px;
                }
                span{
                    color:#70b5f9;
                }
            }
        }
    }
`
const Article = styled(CommonCard)`
    padding:0;
    margin:0 0 8px;
    overflow: hidden;
    button{
        align-items: center;
        margin-right:10px;
        padding:10px 5px;
        img{
            margin-right:10px;
            width:16px;
            height:16px;
            object-fit:contain;
        }
        span{
            align-items:center;
        }
    }
`
const SharedActor = styled.div`
    padding-right:40px;
    flex-wrap:nowrap;
    padding:12px 16px 0;
    margin-bottom:8px;
    align-items:center;
    display:flex;
    a{
        margin-right:12px;
        flex-grow:1;
        overflow: hidden;
        display:flex;
        text-decoration:none;
        img{
            width:48px;
            height:48px;
        }

        & > div {
            display:flex;
            flex-direction: column;
            flex-grow:1;
            flex-basis:0;
            margin-left:8px;
            overflow:hidden;
            span{
                text-align:left;
                &:first-child {
                    font-size:14px;
                    font-weight:700;
                    color:rgba(0,0,0,1);
                }

                &:nth-child(n+1){
                    font-size:12px;
                    color:rgba(0,0,0,0.6); 
                }
            }
        }
    }
    button{
        position:absolute;
        right:12px;
        top:0;
        background:transparent;
        border:none;
        outline:none;
        img{
            color:gray;
            font-size:10px;
            width:20px;
            font-weight:500;
        }
    }
`
const Description = styled.div`
    padding:0 16px;
    overflow:hidden;
    color:rgba(0, 0, 0,0.9);
    font-size:14px;
    text-align:left;
`

const SharedImg = styled.div`
    margin-top:8px;
    width:100%;
    display:block;
    position: relative;
    background-color:#f9fafb;
    img{
        object-fit:contain;
        width:100%;
        height:100%;
    }
`
const SocialCounts = styled.ul`
    line-height:1.3;
    display:flex;
    align-items:flex-start;
    overflow: auto;
    margin:0 16px;
    padding: 8px 0;
    border-bottom:1px solid #e9e5df;
    list-style:none;
    li{
        margin-right:5px;
        font-size:12px;
        button{
            display:flex;
        }
        &:last-child{
            align-items: center;
            margin:auto 0px;
        }
    }
    
`

const SocialActions = styled.div`
    align-items:center;
    display:flex;
    justify-content:flex-start;
    margin:0;
    min-height:40px;
    padding:4px 8px;
    button{
        display:inline-flex;
        align-items: center;
        border: none;
        padding:8px;
        color:#0a66c2;
        @media(min-width:768px){
            span{
                margin-left:5px;
                font-size:18px;
            }
        }
    }
`
const Content = styled.div`
    text-align:center;
    & > img{
        width:30px;
    }
`

const Main = (props) => {
    const [showModal, setShowModal] = useState("close");
    console.log(props.articles);

    useEffect(() => {
        props.getArticle()
    }, [])

    const handleClick = (e) => {
        e.preventDefault();
        if(e.target !== e.currentTarget){
            return ;
        }
        
        switch (showModal){
            case "open":
                setShowModal("close")
                break;
            case "close":
                setShowModal("open");
                break;
            default:
                setShowModal("close");
                break;
        }
    }

    return (
        <>
            {props.articles.length === 0 ? (
                <p>There are no articles</p>
            ) : (
                <Container>
                    <ShareBox>
                        <div>
                            {props.user && props.user.photoURL ? (
                                <img src={props.user.photoURL} alt="" />
                            ) :(
                                <img src="/images/user.svg" alt="" />
                            )}
                            <button onClick={handleClick}>Start a post</button>
                        </div>
                        <div>
                            <button>
                                <img src="/images/photo-icon.png" alt="" />
                                <span>Photo</span>
                            </button>
                            <button>
                                <img src="/images/video-icon.png" alt="" />
                                <span>Video</span>
                            </button>
                            <button>
                                <img src="/images/event-icon.png" alt="" />
                                <span>Event</span>
                            </button>
                            <button>
                                <img src="/images/article-icon.png" alt="" />
                                <span>Write article</span>
                            </button>
                        </div>
                    </ShareBox>
                    <Content>
                        {props.loading && <img src={"/images/spin-loader.svg"} alt="" />}
                        {props.articles.length > 0 && 
                        props.articles.map((article,key) =>(
                            <Article key={key}>
                                <SharedActor>
                                    <a href="/">
                                        <img src={article.actor.image} alt="" />
                                        <div>
                                            <span>{article.actor.title}</span>
                                            <span>{article.actor.description}</span>
                                            <span>{article.actor.date.toDate().toLocaleDateString()}</span>
                                        </div>
                                    </a>
                                    <button>
                                        <img src="/images/ellipsis.svg" alt="" />
                                    </button>
                                </SharedActor>
                                <Description>{article.description}</Description>
                                <SharedImg>
                                    <a href="/">
                                        {!article.sharedImg && article.video ? (
                                            <ReactPlayer width={"100%"} alt={article.video} />
                                        ) : (
                                            article.sharedImg && <img src={article.sharedImg} alt="" />
                                        )}                                
                                    </a>
                                </SharedImg>
                                <SocialCounts>
                                    <li>
                                        <button>
                                            <img src="/images/like.svg" alt="" />
                                            <img src="/images/tim.svg" alt="" />
                                            <img src="/images/clap.svg" alt="" />
                                            <span>75</span>
                                        </button>
                                    </li>
                                    <li>
                                        <a href="/">{article.comments} comments</a>
                                    </li>
                                </SocialCounts>
                                <SocialActions>
                                    <button>
                                        <img 
                                            src="/images/like-icon.png"
                                            alt=""
                                        />
                                        <span>Like</span>
                                    </button>
                                    <button>
                                        <img 
                                            src="/images/comment-icon.png"
                                            alt=""
                                        />
                                        <span>Comments</span>
                                    </button>
                                    <button>
                                        <img 
                                            src="/images/share-icon.png"
                                            alt=""
                                        />
                                        <span>Share</span>
                                    </button>
                                    <button>
                                        <img 
                                            src="/images/send-icon.png"
                                            alt=""
                                        />
                                        <span>Send</span>
                                    </button>
                                </SocialActions>
                            </Article>
                        ))}
                    </Content>
                    <PostModal showModal={showModal} handleClick={handleClick} />
                </Container>
            )
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return{
        loading:state.article.loading,
        user:state.user.user,
        articles:state.article.articles
    }
}

const mapDispatchToProps = (dispatch) => ({
    getArticle: () => dispatch(getArticleAPI())
})

export default connect(mapStateToProps,mapDispatchToProps)(Main)
