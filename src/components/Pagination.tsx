import { useMemo } from "react";
import styled from "styled-components";

const SIDE_PAGES = 3;

export const Pagination = ({
  page,
  setPage,
  totalItems,
  pageSize = 20,
}: {
  page: number;
  setPage: (page: number) => void;
  totalItems: number;
  pageSize?: number;
}) => {
  const totalPages = Math.ceil(Number(totalItems) / pageSize);
  const pages = useMemo(
    () => Array.from({ length: totalPages }, (_, i) => i),
    [totalPages]
  );

  if (totalItems <= pageSize) return null;

  if (totalPages <= SIDE_PAGES * 2) {
    return (
      <PagesContainer>
        <PageButton
          key={"prev"}
          onClick={() => setPage(page - 1 < 0 ? 0 : page - 1)}
        >
          {"<"}
        </PageButton>
        {pages.map(p => (
          <PageButton
            key={p}
            onClick={() => setPage(p)}
            className={p === page ? "selected" : ""}
          >
            {p + 1}
          </PageButton>
        ))}
        <PageButton
          key={"next"}
          onClick={() =>
            setPage(page + 1 > totalPages - 1 ? totalPages - 1 : page + 1)
          }
        >
          {">"}
        </PageButton>
      </PagesContainer>
    );
  }

  return (
    <PagesContainer>
      <FirstPages page={page} setPage={setPage} totalPages={totalPages} />
      {page < SIDE_PAGES || page >= totalPages - SIDE_PAGES ? (
        <PageButtonShort key={"dots_prev"}>{"..."}</PageButtonShort>
      ) : (
        <>
          <PageButtonShort key={"dots_prev"}>{"..."}</PageButtonShort>

          <PageButton
            key={page}
            onClick={() => setPage(page)}
            className={"selected"}
          >
            {page + 1}
          </PageButton>

          <PageButtonShort key={"dots_next"}>{"..."}</PageButtonShort>
        </>
      )}
      <LastPages page={page} setPage={setPage} totalPages={totalPages} />
    </PagesContainer>
  );
};

const FirstPages = ({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) => {
  const pages = useMemo(
    () => Array.from({ length: Math.min(SIDE_PAGES, totalPages) }, (_, i) => i),
    [totalPages]
  );
  return (
    <>
      <PageButton
        key={"prev"}
        onClick={() => setPage(page - 1 < 0 ? 0 : page - 1)}
      >
        {"<"}
      </PageButton>
      {pages.map((p, index) => (
        <PageButton
          key={p}
          onClick={() => setPage(p)}
          className={index === page ? "selected" : ""}
        >
          {p + 1}
        </PageButton>
      ))}
    </>
  );
};

const LastPages = ({
  page,
  setPage,
  totalPages,
}: {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) => {
  const pages = useMemo(() => {
    const start = Math.max(0, totalPages - SIDE_PAGES);
    return Array.from(
      { length: Math.min(SIDE_PAGES, totalPages - start) },
      (_, i) => start + i
    );
  }, [totalPages]);
  return (
    <>
      {pages.map((p, index) => (
        <PageButton
          key={p}
          onClick={() => setPage(p)}
          className={p === page ? "selected" : ""}
        >
          {p + 1}
        </PageButton>
      ))}
      <PageButton
        key={"next"}
        onClick={() =>
          setPage(page + 1 > totalPages - 1 ? totalPages - 1 : page + 1)
        }
      >
        {">"}
      </PageButton>
    </>
  );
};

const PagesContainer = styled.div`
  min-height: 30px;
  display: flex;
  justify-content: center;
  gap: 1px;
`;

const PageButton = styled.button`
  min-width: 30px;
  min-height: 30px;
  font-family: var(--text-sm-font-family);
  font-size: var(--text-sm-font-size);
  font-weight: var(--text-sm-font-weight);
  line-height: var(--text-sm-line-height);

  color: var(--text-primary-color);

  background-color: var(--button-secondary-background-default);

  &:focus {
    border: 1px solid var(--button-secondary-border-focused);
  }
  &:hover,
  &.selected {
    background: var(--button-secondary-background-hovered);
  }
  &:active {
    background: var(--button-secondary-background-pressed);
  }
  border: 1px solid transparent;
  &:first-child {
    border-top-left-radius: var(--border-radius-md);
    border-bottom-left-radius: var(--border-radius-md);
  }
  &:last-child {
    border-top-right-radius: var(--border-radius-md);
    border-bottom-right-radius: var(--border-radius-md);
  }
`;

const PageButtonShort = styled.button`
  min-width: 20px;
  min-height: 30px;

  font-family: var(--text-sm-font-family);
  font-size: var(--text-sm-font-size);
  font-weight: var(--text-sm-font-weight);
  line-height: var(--text-sm-line-height);

  color: var(--text-primary-color);
  background-color: var(--button-secondary-background-default);

  border: 1px solid transparent;
  &:first-child {
    border-top-left-radius: var(--border-radius-md);
    border-bottom-left-radius: var(--border-radius-md);
  }
  &:last-child {
    border-top-right-radius: var(--border-radius-md);
    border-bottom-right-radius: var(--border-radius-md);
  }
`;
