# limaverde.dev
Built in React.js, served by a single AWS EC2 machine running Node.js... My minimalistic Personal Website

For portfolio, refer to my LinkedIn or resumé - those are the right places for that, and they're both on [this very website](https://limaverde.dev)

And since we're here, here's what was done to serve this static website on a Ubuntu instance:

1) Spin up your machine and SSH into it (e.g. `ssh -i my-key-pair.pem my-instance-user-name@my-instance-public-dns-name`)

2) Run a script that will basically update system packages and install NodeJS, like this one:

```bash
sudo apt update &&
sudo apt install nodejs -y &&
sudo apt install npm -y &&
sudo npm i -g n &&
sudo n install 14.18.1 &&
sudo n 14.18.1
```

3) This script below will generate an SSH key based on RSA 4,096 bits and show you your public key

```bash
ssh-keygen -t rsa -b 4096 -C "youremail@yourprovider.com" -f .ssh/id_rsa -q -N "" &&
cat .ssh/id_rsa.pub
```

Then get the contents of your public key and add it to your GitHub account

4) Use your new SSH key to clone whatever server code you want from GitHub onto your remote machine and install the project packages. For the case of this server:

```bash
git clone git@github.com:AllanLimaVerde/limaverde.dev.git &&
cd limaverde.dev &&
npm i &&
npm src
```
(The example above is with cloning this website, naturally. Change it accordingly)

5) Now, to route this server to a custom domain, I used AWS Route 53 to associate the instance to an Elastic IP, then created a hosted zone and created an A record pointing to the Elastic IP. Route 53 will provide you with the names of the Name Servers that you should set your custom domain provider to point to

6) To get HTTPS, you can run this script to install [Certbot](https://certbot.eff.org/) and use it to generate an auto-renewing SSL/TLS certificate:

```bash
sudo snap install core; sudo snap refresh core &&
sudo apt-get remove certbot &&
sudo snap install --classic certbot &&
sudo ln -s /snap/bin/certbot /usr/bin/certbot &&
sudo certbot certonly --standalone
```

7) Run the server, and don't forget that the default port for HTTPS is 443. This repo contains a quite streamlined version of a server for static content (in this case, the build of a webapp made with [React](https://reactjs.org/))
