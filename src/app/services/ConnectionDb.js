import axios from "axios";
const _url = 'https://api.jsonbin.io/v3/b/6284f0e9019db46796a48924',
    secretKey = '$2b$10$XfgSDMUJPiTI4HEY12AUO.T.PvnI2NPVSo5muZHuxM3U6WiNsZL3u';

const requestProducts = async () => {
    const { data, status } = await axios.get(`${_url}/latest`,
        {
            headers: {
                'X-Master-Key': secretKey,
                'X-Bin-Meta': false
            }
        },
    )
    if (status === 200) {
        return data
    }

}

const updateProducts = async (addData) => {
    const { status } = await axios.put(_url, addData,
        {
            headers: {
                'Content-Type': 'application/json',
                'X-Master-Key': '$2b$10$XfgSDMUJPiTI4HEY12AUO.T.PvnI2NPVSo5muZHuxM3U6WiNsZL3u',
                'X-Bin-Versioning': false
            }
        });
    if (status === 200) {
        console.log('ok')
    }
}

export { requestProducts, updateProducts };
