import pandas as pd
from sqlalchemy import create_engine

# Define database parameters
db_params = {
    'host': 'localhost',
    'dbname': 'postgres',
    'user': 'postgres',
    'password': '123',
    'port': '5432'  # Default port for PostgreSQL is 5432
}

# Create the connection string
connection_string = f"postgresql://{db_params['user']}:{db_params['password']}@{db_params['host']}:{db_params['port']}/{db_params['dbname']}"

# Create an engine
engine = create_engine(connection_string)

# Define your SQL query
sql_query = 'SELECT * FROM "Chatgpt"."Translate"'

# Load data into a Pandas DataFrame
df = pd.read_sql_query(sql_query, engine)

# Display the DataFrame
print(df.head())


# Function to filter data
def posgrestGraph(df):
    filtered_df = df[
        (df['model'] == 'gpt-4o') &
        (df['language'] == 'french') &
        ((df['message'] == 'hello') | (df['message'] == 'allo'))
        ]
    return filtered_df


# Call the function and display the filtered DataFrame
filtered_df = posgrestGraph(df)
print(filtered_df)


from matplotlib import pyplot as plt
import seaborn as sns
df.groupby('language').size().plot(kind='barh', color=sns.palettes.mpl_palette('Dark2'))
plt.gca().spines[['top', 'right',]].set_visible(False)