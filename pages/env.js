const Content = `
DATABASE_URL="postgresql://user:password@localhost:5432/mydb"
PORT=3000


# ther env variables... 
# paste the generated access secret key here
ACCESS_TOKEN_SECRET="SecretKeyForAccessToken"
# You can change it to hours, e.g: '1h' 
ACCESS_TOKEN_EXPIRY="3600"
# paste the generated refresh secret key here 
REFRESH_TOKEN_SECRET="SecretKeyForRefreshToken"
# You can change it to hours, e.g: '1h' 
REFRESH_TOKEN_EXPIRY="604800"
`.trimStart();

export default Content;
