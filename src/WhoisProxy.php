<?php

namespace App;

class WhoisProxy
{
    private $apiUrl = 'https://networkcalc.com/api/dns/whois/';

    /**
     * Performs a WHOIS lookup for a given domain.
     * 
     * @param string $domain
     * @return array
     */
    public function lookup(string $domain): array
    {
        $url = $this->apiUrl . urlencode($domain);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        curl_setopt($ch, CURLOPT_USERAGENT, 'Tools-PHP-Proxy/1.0');

        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);

        if ($error) {
            return [
                'status' => 'error',
                'message' => 'CURL error: ' . $error
            ];
        }

        if ($httpCode !== 200) {
            return [
                'status' => 'error',
                'message' => 'Upstream API returned HTTP ' . $httpCode
            ];
        }

        $data = json_decode($response, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            return [
                'status' => 'error',
                'message' => 'Failed to parse upstream JSON'
            ];
        }

        return $data;
    }
}
