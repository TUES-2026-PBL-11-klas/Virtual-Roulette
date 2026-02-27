# Tues project 

### About 
This is simple implementation of popular game - roulette. Its purpose is to show the high risk of gambling. Using database, cloud technology, OOP and code infrastructure.

## To start the app
```
cd ...Virtual-Roulette\k8s
kubectl apply --server-side -f https://raw.githubusercontent.com/cloudnative-pg/cloudnative-pg/main/releases/cnpg-1.24.0.yaml
kubectl apply -f .
kubectl apply -f ./frontend
kubectl apply -f ./database
kubectl apply -f ./backend

kubectl port-forward svc/backend 3030:80 -n roulette
kubectl port-forward svc/frontend 8080:80 -n roulette
```
#### To start local dev
docker compose up --build