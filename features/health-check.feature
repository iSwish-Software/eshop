Feature: health check endpoints

  When operations want to monitor the status of an app in real time
  They want the app to have a health check endpoint that report the health of the app
  So that they can retrieve the status of the app periodically and take timely action based on the status

  Scenario: basic health check endpoint
    Given the base url of the 'ProductCatalog' API is 'https://localhost:1443'
    When a GET request is sent to the '/health' endpoint of the 'ProductCatalog' API
    Then the response status code should be '200'
    And the response body should be 
    """
    Healthy
    """
