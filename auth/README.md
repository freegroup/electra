# Install ext_authz Component for ISTIO



```
export IDP_DOMAIN=thindexed.eu.auth0.com                                                 
export IDP_CLIENT_ID=Vxx5W6LtBo1GfxwtyfB1IuxhFEw5tYGs
export IDP_CLIENT_SECRET=-nADGij36xI4S8122sDWsbTEKkXshzbaIss2Uaw6jzPQpl8h6mhkEUCJ0eBYRLqu

kubectl create secret generic -n auth idp-binding \
         "--from-literal=IDP_DOMAIN=$IDP_DOMAIN" \
         "--from-literal=IDP_CLIENT_ID=$IDP_CLIENT_ID" \
         "--from-literal=IDP_CLIENT_SECRET=$IDP_CLIENT_SECRET"

```