import { NavigationBar } from "../../components/NavigationBar";
import { SearchContainer } from "./searchContainer";
import { CategoriesContainer } from "./categoriesContainer";
import { BsArrowDownCircle } from "react-icons/bs";
import { Box, Button, Card, Columns, Container, Content, Footer, Form, Heading, Hero, Media, Modal } from "react-bulma-components";
import { FooterSection } from "../../components/Footer";
import './homepage.css';
import { articles } from './sampleArticles'
import { Category, FetchCategories } from "../../components/dbFunctions/fetchCategories";
import { useEffect, useState } from "react";


export const Homepage = () => {
    const [categories, setCategories] = useState<Array<Category>>([]);
    const [collapsedCategory, setCollapsedCategory] = useState<string | null>(null);
    const toggleCollapse = (categoryLabel: string) => {
        setCollapsedCategory((prevCollapsedCategory) =>
        prevCollapsedCategory === categoryLabel ? null : categoryLabel
        );
    };
    
    const [addCategory, setAddCategory] = useState(false);

    useEffect(() => {
    FetchCategories().then((categories) => {
      if (categories) {setCategories(categories);}});}, []);

    return (
        <>
        <Hero size='fullheight'>
        
            <NavigationBar />
            <Hero.Body style={{
                        paddingInline: '28px',
                        paddingBlock: '60px 28px',
                        display: 'flex',
                        alignItems: 'flex-start',
            }} >
            <div className="left-side"
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                 }}
                    >
                <Container
                    style={{
                        width: '100%',
                        flex: 1,
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
                                    borderRadius: '50px 0 0 50px',
                                    border: '1px solid #307FE2',
                                    borderRight: 'none',
                                    height: '60px',
                                    width: '100%',
                                    }}>
                            </Form.Input>                                     
                        </Form.Control>
                        <Form.Control>
                            <Button style={{
                                backgroundColor: '#3080e236',
                                borderRadius: '0 50px 50px 0',
                                border: '1px solid #307FE2',
                                color: '#307FE2',
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
                        style={{
                            marginTop: '15px',
                            height: '40%',
                            flex: 1,
                        }}>
                        {articles.map((item) => (
                            <Columns.Column
                                // key={item.id}
                                className="is-one-third"
                                style={{
                                    padding: '10px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}>
                            <Card
                                style={{
                                    width: "100%",
                                    backgroundColor: "#ffffff",
                                    boxShadow: "0 0 5px #888888",
                                    borderRadius: '10px',
                                    padding: '15px',
                                    flex: 1,
                                }}>
                                <Heading
                                    style={{
                                        marginBottom: '15px',
                                    }}>{item.title}</Heading>
                                <Content
                                    style={{
                                        height: "47%",
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis', 
                                        flex: 1,
                                        marginBottom: '15px',
                                    }}>
                                    {item.content}</Content>
                                <Button
                                    style={{
                                        backgroundColor: '#3080e236',
                                        borderRadius: '25px',
                                        border: '1px solid #307FE2',
                                        color: '#307FE2',
                                        fontWeight: '600',
                                        position: 'relative',
                                        marginBottom: '15px',
                                    }}>
                                    View article</Button>
                            </Card>
                        </Columns.Column>
                        ))}
                        <Columns.Column
                            style={{
                                padding: '10px',
                                display: 'flex',
                                flexDirection: 'column',
                            }}>
                            <Card
                                style={{
                                    width: "100%",
                                    backgroundColor: "#307FE2",
                                    borderRadius: '10px',
                                    boxShadow: "0 0 5px #888888",
                                    cursor: "pointer",
                                    padding: '15px',
                                    flex: 1
                                }}>
                                    <Heading size={4}
                                    style={{
                                        color: "white",
                                    }}
                                    >
                                    Submit Ticket
                                    </Heading>
                                    <Content
                                    style={{
                                        color: "white",
                                    }}
                                    >
                                    Can't find what you're looking for? Submit a ticket!
                                    </Content>
                            </Card>
                        </Columns.Column>
                    </Columns>
                </Container>
            </div>
            <div className="right-side"
                style={{
                    backgroundColor: '',
                }}>
                <div
                    style={{
                        margin: '0',
                        fontWeight: '500',
                    }}>Categories:
                </div>
                <section
                    style={{
                        marginTop: '10px',
                    }}
                    >
                    <Button size={"small"}
                        style={{
                            backgroundColor: '#d9ead3',
                            fontWeight: '500',
                            border: '1px solid #47bd13',
                            color: '#47bd13',
                            }}
                        onClick={() => {setAddCategory(true);}}
                        >
                        + Add a category</Button>
                    <Modal
                        show={addCategory}
                        onClose={() => setAddCategory(false)}
                        >
                        <Modal.Card>
                            <Modal.Card.Header showClose>
                                <Modal.Card.Title>Add a category</Modal.Card.Title>
                            </Modal.Card.Header>
                            <Modal.Card.Body>
                                <Form.Field>
                                    <Form.Label>Category name</Form.Label>
                                    <Form.Input
                                        type='text'
                                        placeholder="Input category name">
                                    </Form.Input>
                                </Form.Field>
                            </Modal.Card.Body>
                            <Modal.Card.Footer>
                            <Button
                                style={{
                                    display: 'flex',
                                    marginLeft: 'auto',
                                    backgroundColor: '#3080e236',
    
                                    border: '1px solid #307FE2',
                                    color: '#307FE2',
                                    fontWeight: '600',
                                }}
                                >Submit</Button>
                            </Modal.Card.Footer>
                        </Modal.Card>
                    </Modal>
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
                    className='scrollbar-hide'
                    style={{
                        marginTop: '10px',
                        maxHeight: '73vh',
                        overflowY: 'auto',
                    }}>
                    {categories.map((category) => (
                    <Card
                        key={category.label}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            // justifyContent: 'space-between',
                            // alignContent: 'center',
                            width: "100%",
                            backgroundColor: "#ffffff",
                            borderRadius: '10px',
                            padding: '10px',
                            marginBlock: '0 10px',
                            border: '1px solid #bcbcbc',
                            boxShadow: 'none',
                        }}>
                        <Heading
                        onClick={() => {
                            toggleCollapse(category.label);
                          }}
                            style={{
                                fontWeight: '500',
                                fontSize: '16px',
                                margin: '0',
                                cursor: 'pointer',
                            }}
                        >{category.label}</Heading>
                        <Content 
                            style={{
                                borderBottom: '1px solid #307FE2',
                                margin: '5px 0 5px 0',
                                display: collapsedCategory === category.label ? "block" : "none",
                                }}>
                        </Content>
                        {articles.map((item) => (
                        <Content
                            key={item.title}
                            style={{
                                fontWeight: '300',
                                fontSize: '16px',
                                margin: '0px',
                                cursor: 'pointer',
                                display: collapsedCategory === category.label ? "block" : "none",
                            }}>
                            {item.title}</Content>
                        ))}
                        {/* <BsArrowDownCircle size={20}/> */}
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