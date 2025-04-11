type ErrorMessage = {
  err: string;
};

type ErrorCode = {
  status: number;
};

function getUnauthedResponse(): [ErrorMessage, ErrorCode] {
  return [{ err: `Unauthorized operation` }, { status: 401 }];
}

export { getUnauthedResponse };
