ansible-playbook -i ./ansible/inventory.ini ./ansible/02_playbook_deploy.yaml    

ansible-playbook -i ./ansible/inventory.ini ./ansible/03_playbook_letsencrypt.yaml

ssh -i ~/.ssh/hetzner_server_draw2d-backend root@167.235.26.49

## check certificate

```ssh
openssl s_client -connect electra.academy:443 -servername electra.academy < /dev/null 2>/dev/null | openssl x509 -noout -dates         


```