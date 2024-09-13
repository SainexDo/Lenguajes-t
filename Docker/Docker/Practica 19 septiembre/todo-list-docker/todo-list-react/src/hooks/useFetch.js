import { useState } from "react";

const useFetchGet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const get = async (url, id = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(url + id, {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        }
      });
      if (!response.ok)
        throw new Error("Response error: ");
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  }
  return { get, isLoading, error }
};

const useFetchPost = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const post = async (url, body) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "POST",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
      if (!response.ok)
        throw new Error("Response error: ");
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      setError(e.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }
  return { post, isLoading, error };
}

const useFetchPut = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const put = async (url, body) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        method: "PUT",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
      if (!response.ok)
        throw new Error("Response error: ");
      const data = await response.json();
      return data;
    } catch (e) {
      console.error(e);
      setError(e.message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }
  return { put, isLoading, error };
}

export { useFetchGet, useFetchPost, useFetchPut };