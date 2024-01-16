import { NavigationBar } from "../../components/NavigationBar";
import { SearchContainer } from "./searchContainer";
import { CategoriesContainer } from "./categoriesContainer";
import { BsArrowDownCircle } from "react-icons/bs";
import { Box, Button, Card, Columns, Container, Content, Footer, Form, Heading, Hero, Media } from "react-bulma-components";
import { FooterSection } from "../../components/Footer";
import './homepage.css';
import { articles } from './sampleArticles'
import { Category, FetchCategories } from "../../components/dbFunctions/fetchCategories";
import { useEffect, useState } from "react";


export const Homepage = () => {
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapse = () => {setCollapsed(!collapsed);};

    useEffect(() => {
    FetchCategories().then((categories) => {
      if (categories) {setCategories(categories);}});}, []);

    return (
        <>
        <Hero size='fullheight'>
        
            <NavigationBar />
            <Hero.Body style={{
                        paddingInline: '28px',
                        paddingTop: '60px',
                        display: 'flex',
                        alignItems: 'flex-start',
            }} >
            <div className="left-side"
                style={{
                    // height: '100%',
                 }}
                    >
                <Container
                    style={{
                        width: '100%',
                    }}>
                    <Form.Field
                        style={{
                            display: 'flex',
                        }}>
                        <Form.Control
                            style={{
                                display: 'flex',
                                flex: '1',
                                 }}>
                            <Form.Input 
                                placeholder="Search"
                                style={{
                                    boxShadow: "0 0 5px #888888",
                                    borderRadius: '50px 0 0 50px',
                                    height: '60px',
                                    width: '100%',
                                    }}>
                            </Form.Input>                                     
                        </Form.Control>
                        <Form.Control>
                            <Button style={{
                                boxShadow: "0 0 5px #888888",
                                borderRadius: '0 50px 50px 0',
                                height: '60px',
                                }}>Clear
                            </Button>
                        </Form.Control>
                    </Form.Field>
                    <Form.Field>
                        <Form.Label
                            style={{
                                fontWeight: '400',
                                borderBottom: '1px solid #ccc',
                                paddingBottom: '5px',
                            }}>
                            Most searched result:</Form.Label>
                    </Form.Field>
                    <Columns
                        style={{}}>
                        {articles.map((item) => (
                            <Columns.Column
                                // key={item.id}
                                className="is-one-third"
                                style={{
                                    padding: '10px 5px 0 5px',
                                }}>
                            <Card
                                style={{
                                    width: "100%",
                                    backgroundColor: "#ffffff",
                                    boxShadow: "0 0 5px #888888",
                                    borderRadius: '10px',
                                    padding: '10px',
                                }}>
                                <Heading>{item.title}</Heading>
                                <Content
                                    style={{
                                        height: '10svh',
                                        overflow: 'hidden',
                                    }}>
                                    {item.content}</Content>
                                <Button
                                    style={{
                                        backgroundColor: '#3080e236',
                                        borderRadius: '25px',
                                        border: '1px solid #307FE2',
                                        color: '#307FE2',
                                        fontWeight: '600',
                                    }}>
                                    View article</Button>
                            </Card>
                        </Columns.Column>
                        ))}
                        <Columns.Column
                            style={{
                                padding: '10px 5px 0 5px',
                            }}>
                            <Card
                                style={{
                                    width: "100%",
                                    minHeight: "100%",
                                    backgroundColor: "#307FE2",
                                    borderRadius: '10px',
                                    boxShadow: "0 0 5px #888888",
                                    cursor: "pointer",
                                }}>
                                <Card.Content>
                                    <Media>
                                    <Media.Item>
                                        <Heading
                                        size={4}
                                        style={{
                                            color: "white",
                                        }}
                                        >
                                        Submit Ticket
                                        </Heading>
                                    </Media.Item>
                                    </Media>
                                    <Content
                                    style={{
                                        color: "white",
                                    }}
                                    >
                                    Can't find what you're looking for? Submit a ticket!
                                    </Content>
                                </Card.Content>
                            </Card>
                        </Columns.Column>
                    </Columns>
                </Container>
            </div>
            <div className="right-side"
                style={{
                    backgroundColor: '',
                }}>
                <section
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'right',
                    }}
                    >
                    <Button size={"small"}
                        style={{
                            backgroundColor: '#d9ead3',
                            fontWeight: '500',
                            border: '1px solid #47bd13',
                            color: '#47bd13',
                            }}
                        >
                        + Add a category</Button>
                    <Button size={"small"}
                        style={{
                            backgroundColor: '#3080e236',
                            fontWeight: '500',
                            border: '1px solid #307FE2',
                            color: '#307FE2',
                            }}
                        >
                        Edit</Button>
                </section>
                <section
                    style={{
                        marginTop: '20px',
                    }}>
                    {categories.map((category) => (
                    <Card
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignContent: 'center',
                            width: "100%",
                            backgroundColor: "#ffffff",
                            borderRadius: '10px',
                            padding: '10px',
                            marginBlock: '10px',
                            border: '1px solid #bcbcbc',
                            boxShadow: 'none',
                            
                        }}>
                        <Heading
                            style={{
                                fontWeight: '400',
                                fontSize: '16px',
                                margin: '0px'
                            }}
                        >
                            {category.label}</Heading>
                        <Content
                            style={{
                                
                            }}>
                            </Content>
                        <BsArrowDownCircle size={20}/>
                    </Card>
                    ))}
                </section>
            </div>
            </Hero.Body>

            <Hero.Footer marginless paddingless>
                <FooterSection />
            </Hero.Footer>
        </Hero>






            {/* <div className='contents'>
                <SearchContainer/>
                <CategoriesContainer/>
            </div> */}
        </>
    )
}