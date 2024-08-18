# Express.js Proxy for UPC Database API

This project is an Express.js-based proxy for the [UPC Database API](https://api.upcdatabase.org). The proxy serves as a middleman to handle custom headers, as the UPC Database API does not accept lowercase headers. Additionally, the proxy server is secured from unknown agents by requiring a `PROXY_TOKEN`, which is passed in the `x-upcdp-authorization` header.

## Features

- **Custom Header Handling**: Ensures compliance with UPC Database API's case sensitivity requirements for headers.
- **Proxy Server Security**: Only requests that include the correct `PROXY_TOKEN` in the `x-upcdp-authorization` header are processed, protecting the server from unauthorized access.

## Requirements

- Node.js and npm installed on your machine.
- An active account and API key from the UPC Database.
- A secure `PROXY_TOKEN` for authentication to the proxy server.

## Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Helmare/upcdatabase-proxy.git
    cd upcdatabase-proxy
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Create an `.env` file** with your proxy token:
    ```bash
    PROXY_TOKEN=your_secure_proxy_token_here
    ```

4. **Run the proxy server**:
    ```bash
    npm start
    ```

## Usage

To use the proxy, include the `x-upcdp-authorization` header with the correct `PROXY_TOKEN` when making requests. Only authorized requests will be forwarded to the UPC Database API.

### Example Request

```bash
curl -X GET http://localhost:3000/api/upc/{your-upc-code} \
  -H "x-upcdp-authorization: your_secure_proxy_token_here"
```

This request will be forwarded to the UPC Database API with the correct headers and processed if the provided token matches the one defined in the proxy.

## Contributing

Feel free to submit issues or pull requests. Contributions are welcome!

## License

This project is licensed under the ISC License.
