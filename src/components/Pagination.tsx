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

  if (totalItems <= pageSize) return null;

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
  ${({ theme }) => theme.fonts.typography.textSm};
  color: ${({ theme }) => theme.colors.selectedTheme.text.primary};
  background-color: ${({ theme }) =>
    theme.colors.selectedTheme.button["secondary"].background.default};
  &:focus {
    border: ${({ theme }) =>
      `1px solid ${theme.colors.selectedTheme.button["secondary"].border.focused} !important`};
  }
  &:hover,
  &.selected {
    background: ${({ theme }) =>
      theme.colors.selectedTheme.button["secondary"].background.hovered};
  }
  &:active {
    background: ${({ theme }) =>
      theme.colors.selectedTheme.button["secondary"].background.pressed};
  }
  border: 1px solid transparent;
  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.borderRadius.md};
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.md};
  }
  &:last-child {
    border-top-right-radius: ${({ theme }) => theme.borderRadius.md};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;

const PageButtonShort = styled.button`
  min-width: 20px;
  min-height: 30px;
  ${({ theme }) => theme.fonts.typography.textSm};
  color: ${({ theme }) => theme.colors.selectedTheme.text.primary};
  background-color: ${({ theme }) =>
    theme.colors.selectedTheme.button["secondary"].background.default};
  /* &:focus {
    border: ${({ theme }) =>
    `1px solid ${theme.colors.selectedTheme.button["secondary"].border.focused} !important`};
  } */
  /* &:hover,
  &.selected {
    background: ${({ theme }) =>
    theme.colors.selectedTheme.button["secondary"].background.hovered};
  }
  &:active {
    background: ${({ theme }) =>
    theme.colors.selectedTheme.button["secondary"].background.pressed};
  } */
  border: 1px solid transparent;
  &:first-child {
    border-top-left-radius: ${({ theme }) => theme.borderRadius.md};
    border-bottom-left-radius: ${({ theme }) => theme.borderRadius.md};
  }
  &:last-child {
    border-top-right-radius: ${({ theme }) => theme.borderRadius.md};
    border-bottom-right-radius: ${({ theme }) => theme.borderRadius.md};
  }
`;
