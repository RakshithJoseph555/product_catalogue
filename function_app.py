import azure.functions as func
import azure.cosmos as CosmosClient
import datetime
import json
import logging

DB_ENDPOINT = "https://productstoredb.documents.azure.com:443/"
DB_KEY = "ibTHQ1EsshyGddtBautdJYXD9eWevGmpZeQ0dg3QXay8ILRwu6YKclMHjUHQowwDx3E8gmViBBaqACDbmQ6Dbw=="

client=CosmosClient(DB_ENDPOINT, DB_KEY)
db_name = 'productstoredb'
container_name = 'ToDoList'
database = client.get_database_client(db_name)
container=database.get_container_client(container_name)
app = func.FunctionApp()


@app.route(route="listProd", auth_level=func.AuthLevel.FUNCTION)
def listProd(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')
    try:
        items=list(container.read_all_items())
        return func.HttpResponse(json.dumps(items))
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}")
    


@app.route(route="addProd", auth_level=func.AuthLevel.FUNCTION)
def addProd(req: func.HttpRequest) -> func.HttpResponse:
    logging.info('Python HTTP trigger function processed a request.')

    try:
        data=req.get_json()
        prod={
            "id":data['id'],
            "name":data['name'],
            "price":data['pricd']
        }
        container.create_item(prod)
        return func.HttpResponse(f"Product added successfully")
    except Exception as e:
        return func.HttpResponse(f"Error: {str(e)}")
        