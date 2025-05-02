import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiMoreLine,
} from "@remixicon/react";
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
          <LeftArrow />
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
          <RightArrow />
        </PageButton>
      </PagesContainer>
    );
  }

  return (
    <PagesContainer>
      <FirstPages page={page} setPage={setPage} totalPages={totalPages} />
      {page < SIDE_PAGES || page >= totalPages - SIDE_PAGES ? (
        <PageButtonShort key={"dots_prev"}>
          <Dots />
        </PageButtonShort>
      ) : (
        <>
          <PageButtonShort key={"dots_prev"}>
            <Dots />
          </PageButtonShort>

          <PageButton
            key={page}
            onClick={() => setPage(page)}
            className={"selected"}
          >
            {page + 1}
          </PageButton>

          <PageButtonShort key={"dots_next"}>
            <Dots />
          </PageButtonShort>
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
        <LeftArrow />
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
        <RightArrow />
      </PageButton>
    </>
  );
};

const RightArrow = styled(RiArrowRightSLine)`
  width: 16px;
  height: 16px;
  color: var(--text-sub-600);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const LeftArrow = styled(RiArrowLeftSLine)`
  width: 16px;
  height: 16px;
  color: var(--text-sub-600);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Dots = styled(RiMoreLine)`
  width: 16px;
  height: 16px;
  color: var(--text-sub-600);

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const PagesContainer = styled.div`
  min-height: 30px;
  display: flex;
  justify-content: center;
  gap: 1px;
`;

const PageButton = styled.button`
  position: relative;
  min-width: 24px;
  min-height: 24px;
  font-family: var(--text-x-small-font-family);
  font-size: var(--text-x-small-font-size);
  font-weight: var(--text-x-small-font-weight);
  line-height: var(--text-x-small-line-height);

  color: var(--text-sub-600);
  background-color: var(--bg-strong-950);

  &:focus {
    border: 1px solid var(--button-secondary-border-focused);
  }
  &:hover,
  &.selected {
    background-color: var(--bg-strong-900);
  }
  &:active {
    background: var(--bg-surface-800);
  }
  border: 1px solid transparent;
  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;

const PageButtonShort = styled.button`
  position: relative;
  min-width: 24px;
  min-height: 24px;

  font-family: var(--text-x-small-font-family);
  font-size: var(--text-x-small-font-size);
  font-weight: var(--text-x-small-font-weight);
  line-height: var(--text-x-small-line-height);

  color: var(--text-sub-600);
  background-color: var(--bg-strong-950);

  border: 1px solid transparent;
  &:first-child {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
  }
  &:last-child {
    border-top-right-radius: 6px;
    border-bottom-right-radius: 6px;
  }
`;
