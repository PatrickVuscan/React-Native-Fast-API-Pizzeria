from PizzaParlour import app

def test_pizza():
    response = app.test_client().get('/pizza')

    assert response.status_code == 500
    assert response.data == b'Welcome to Pizza Planet!'
