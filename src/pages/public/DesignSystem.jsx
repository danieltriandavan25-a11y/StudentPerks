import { useState } from "react";
import {
  Alert,
  Badge,
  Button,
  Card,
  CardBody,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ConfirmDialog,
  Dropdown,
  EmptyState,
  Input,
  LoadingState,
  Modal,
  SearchField,
  Select,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  Textarea,
  useToast,
} from "../../components/ui";

/**
 * Dev-only preview of the UI foundation.
 * Route: /design-system
 *
 * This page is only for testing reusable UI components.
 * It can be removed once the real application pages are built.
 */
function Section({ title, children }) {
  return (
    <section className="space-y-4">
      <h2 className="border-b border-slate-200 pb-2 text-lg font-semibold text-slate-900">
        {title}
      </h2>

      {children}
    </section>
  );
}

function DesignSystem() {
  const toast = useToast();

  const [modalOpen, setModalOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <header>
        <p className="text-sm font-semibold text-blue-600">
          StudentPerks
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
          Design system
        </h1>

        <p className="mt-2 max-w-2xl text-slate-600">
          Professional, accessible UI foundation designed for students,
          businesses, and administrators.
        </p>
      </header>

      {/* Buttons */}
      <Section title="Buttons">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button loading>Saving</Button>
          <Button disabled>Disabled</Button>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Section>

      {/* Badges */}
      <Section title="Badges">
        <div className="flex flex-wrap gap-2">
          <Badge>Neutral</Badge>

          <Badge variant="brand" dot>
            Featured
          </Badge>

          <Badge variant="success" dot>
            Approved
          </Badge>

          <Badge variant="warning" dot>
            Pending
          </Badge>

          <Badge variant="danger" dot>
            Rejected
          </Badge>

          <Badge variant="info" dot>
            Info
          </Badge>
        </div>
      </Section>

      {/* Form controls */}
      <Section title="Form controls">
        <Card padded>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input
              label="Full name"
              placeholder="Jane Doe"
              required
            />

            <Input
              label="Email"
              type="email"
              defaultValue="not-an-email"
              error="Enter a valid email address."
            />

            <Select
              label="Category"
              placeholder="Choose a category"
              options={[
                { value: "a", label: "Option A" },
                { value: "b", label: "Option B" },
              ]}
              hint="Native select for the best mobile experience."
            />

            <Input
              label="Disabled"
              disabled
              defaultValue="Read only"
            />

            <Textarea
              label="Description"
              hint="Keep it short and clear."
              wrapperClassName="sm:col-span-2"
            />
          </div>
        </Card>

        <SearchField
          value={query}
          onChange={setQuery}
          placeholder="Search…"
          label="Search sample content"
        />
      </Section>

      {/* Alerts and Toasts */}
      <Section title="Alerts & toasts">
        <div className="grid gap-3">
          <Alert variant="info" title="Information">
            Neutral informational message.
          </Alert>

          <Alert variant="success" title="Success">
            The action completed.
          </Alert>

          <Alert variant="warning" title="Warning">
            Something needs attention.
          </Alert>

          <Alert variant="danger" title="Error">
            Something went wrong.
          </Alert>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={() => toast.success("Changes saved.")}
          >
            Success toast
          </Button>

          <Button
            variant="secondary"
            onClick={() =>
              toast.error("Could not save.", {
                title: "Error",
              })
            }
          >
            Error toast
          </Button>

          <Button
            variant="secondary"
            onClick={() => toast.warning("Check your input.")}
          >
            Warning toast
          </Button>

          <Button
            variant="secondary"
            onClick={() => toast.info("Heads up.")}
          >
            Info toast
          </Button>
        </div>
      </Section>

      {/* Cards */}
      <Section title="Cards">
        <div className="grid gap-4 sm:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Card title</CardTitle>

              <CardDescription>
                Supporting description text.
              </CardDescription>
            </CardHeader>

            <CardBody>
              <p className="text-sm text-slate-600">
                Body content goes here.
              </p>
            </CardBody>

            <CardFooter>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>

              <Button size="sm">
                Save
              </Button>
            </CardFooter>
          </Card>

          <Card padded className="space-y-3">
            <Skeleton className="h-4 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </Card>
        </div>
      </Section>

      {/* Table */}
      <Section title="Table">
        <Table caption="Sample table">
          <TableHead>
            <TableRow>
              <TableHeader>Name</TableHeader>
              <TableHeader>Status</TableHeader>
              <TableHeader align="right">
                Amount
              </TableHeader>
              <TableHeader align="right">
                Actions
              </TableHeader>
            </TableRow>
          </TableHead>

          <TableBody>
            {[
              ["Item one", "success", "Approved", "120"],
              ["Item two", "warning", "Pending", "45"],
              ["Item three", "danger", "Rejected", "0"],
            ].map(([name, variant, status, amount]) => (
              <TableRow key={name}>
                <TableCell className="font-medium text-slate-900">
                  {name}
                </TableCell>

                <TableCell>
                  <Badge variant={variant} dot>
                    {status}
                  </Badge>
                </TableCell>

                <TableCell align="right">
                  {amount}
                </TableCell>

                <TableCell align="right">
                  <Dropdown
                    label="Actions"
                    triggerAriaLabel={`Actions for ${name}`}
                    variant="ghost"
                    size="sm"
                    items={[
                      {
                        label: "View",
                        onSelect: () =>
                          toast.info(`View ${name}`),
                      },
                      {
                        label: "Edit",
                        onSelect: () =>
                          toast.info(`Edit ${name}`),
                      },
                      {
                        type: "separator",
                      },
                      {
                        label: "Delete",
                        danger: true,
                        onSelect: () =>
                          setConfirmOpen(true),
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Section>

      {/* Tabs */}
      <Section title="Tabs">
        <Tabs
          label="Sample tabs"
          tabs={[
            {
              id: "one",
              label: "Overview",
              count: 3,
              content: (
                <p className="text-sm text-slate-600">
                  First panel.
                </p>
              ),
            },
            {
              id: "two",
              label: "Details",
              content: (
                <p className="text-sm text-slate-600">
                  Second panel.
                </p>
              ),
            },
            {
              id: "three",
              label: "Disabled",
              disabled: true,
              content: null,
            },
          ]}
        />
      </Section>

      {/* Empty and loading states */}
      <Section title="Empty & loading states">
        <div className="grid gap-4 md:grid-cols-2">
          <EmptyState
            title="Nothing here yet"
            description="When items exist, they will show up in this space."
            action={
              <Button size="sm">
                Add item
              </Button>
            }
          />

          <Card>
            <LoadingState label="Loading data…" />
          </Card>
        </div>
      </Section>

      {/* Dialogs */}
      <Section title="Dialogs">
        <div className="flex flex-wrap gap-3">
          <Button
            variant="secondary"
            onClick={() => setModalOpen(true)}
          >
            Open modal
          </Button>

          <Button
            variant="danger"
            onClick={() => setConfirmOpen(true)}
          >
            Open confirmation
          </Button>
        </div>

        <Modal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Modal title"
          description="Built on the native dialog element."
          footer={
            <>
              <Button
                variant="secondary"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>

              <Button
                onClick={() => setModalOpen(false)}
              >
                Save
              </Button>
            </>
          }
        >
          <Input label="Example field" />
        </Modal>

        <ConfirmDialog
          open={confirmOpen}
          title="Delete this item?"
          description="This action cannot be undone."
          confirmLabel="Delete"
          variant="danger"
          onCancel={() => setConfirmOpen(false)}
          onConfirm={() => {
            setConfirmOpen(false);
            toast.success("Item deleted.");
          }}
        />
      </Section>
    </div>
  );
}

export default DesignSystem;
